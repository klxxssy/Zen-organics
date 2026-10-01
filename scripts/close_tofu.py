"""Cierra el modelo del tofu (abierto por abajo).

1. Recorta la franja irregular de la base del escaneo (z < Z_CUT).
2. Crea una copia espejada de la malla bajo el plano de corte: la base pasa a ser
   la cara superior dada vuelta, y la copia comparte exactamente el borde (sin costura).
3. Rellena un agujero chico de la cara superior.

Uso (desde scripts/, con numpy):  python3 close_tofu.py   (lee tofu-original.glb, escribe tofu-closed.glb)
Luego: copiar a public/models/tofu.glb y ejecutar  npm run optimize:model
"""
import json, struct, numpy as np, glbio
from collections import Counter

SQUASH = 1.0  # espejo completo: la base es la cara superior dada vuelta y la unión calza exacta

P, N, UV, I, j = glbio.load('tofu-original.glb')
key = np.round(P, 4)
U, inv = np.unique(key, axis=0, return_inverse=True); inv = inv.ravel()

# Malla soldada por posición (UV por vértice soldado: primera aparición)
first = np.zeros(len(U), dtype=np.int64); first[inv[::-1]] = np.arange(len(inv))[::-1]
V = U.astype(np.float64); T = inv[I]; UVw = UV[first]

# 0) Recortar la franja irregular de la base del escaneo (z < Z_CUT); las paredes son rectas
Z_CUT = 28.0
T = T[(V[T][:, :, 2] >= Z_CUT).all(axis=1)]
used0 = np.unique(T); re0 = -np.ones(len(V), dtype=np.int64); re0[used0] = np.arange(len(used0))
V, UVw, T = V[used0], UVw[used0], re0[T]

def boundary_components(T):
    """Componentes conexas de aristas de borde (no requiere bucles simples)."""
    e = np.concatenate([T[:, [0, 1]], T[:, [1, 2]], T[:, [2, 0]]])
    c = Counter(map(tuple, np.sort(e, axis=1)))
    bd = [k for k, v in c.items() if v == 1]
    comps = glbio.loops(bd)
    directed = {}
    for a, b in e:
        if c[tuple(sorted((a, b)))] == 1: directed[a] = b
    return comps, directed

comps, directed = boundary_components(T)
comps = sorted(comps, key=len, reverse=True)
bottom, small = comps[0], comps[1:]
print('bottom boundary verts', len(bottom), 'small holes', [len(h) for h in small])

def ordered(h):
    loop, v = [h[0]], directed[h[0]]
    while v != h[0]:
        loop.append(v); v = directed[v]
    assert len(loop) == len(h), 'agujero no simple'
    return loop
holes = [ordered(h) for h in small]

# 1) Emparejar la base: todo lo que está bajo el punto más alto del borde inferior
#    se lleva a ese plano, así el borde queda plano y la copia espejada calza exacto.
nb = np.array(bottom)
z0 = Z_CUT
V[nb, 2] = z0  # borde inferior exactamente plano
M = V.copy()
M[:, 2] = z0 - SQUASH * (V[:, 2] - z0)
M[nb] = V[nb]  # el borde de la copia coincide exactamente con el original -> soldado
offset = len(V)
T2 = T[:, ::-1] + offset  # reflejo invierte orientación
# Soldar: índices del borde de la copia apuntan a los del original
remap = np.arange(offset * 2); remap[nb + offset] = nb
T2 = remap[T2]
V_all = np.vstack([V, M]); UV_all = np.vstack([UVw, UVw]); T_all = np.vstack([T, T2])

# 2) Rellenar agujeros chicos con abanico desde el centroide
# El agujero existe también en la copia espejada (orientación invertida)
holes = holes + [[i + offset for i in h[::-1]] for h in holes]
for h in holes:
    c = V_all[h].mean(axis=0)
    ci = len(V_all); V_all = np.vstack([V_all, c]); UV_all = np.vstack([UV_all, UV_all[h].mean(axis=0)])
    T_all = np.vstack([T_all, [[h[(k + 1) % len(h)], h[k], ci] for k in range(len(h))]])

# Quitar vértices sin uso (los del borde duplicado)
used = np.unique(T_all); newidx = -np.ones(len(V_all), dtype=np.int64); newidx[used] = np.arange(len(used))
V_all, UV_all, T_all = V_all[used], UV_all[used], newidx[T_all]

# Orientación de rellenos: verificar que el volumen sea positivo (normales hacia afuera)
a, b, c = V_all[T_all[:, 0]], V_all[T_all[:, 1]], V_all[T_all[:, 2]]
vol = np.einsum('ij,ij->i', a, np.cross(b, c)).sum() / 6
if vol < 0: T_all = T_all[:, ::-1]

# Normales suaves (ponderadas por área)
fn = np.cross(V_all[T_all[:, 1]] - V_all[T_all[:, 0]], V_all[T_all[:, 2]] - V_all[T_all[:, 0]])
Nn = np.zeros_like(V_all)
for k in range(3): np.add.at(Nn, T_all[:, k], fn)
Nn /= np.linalg.norm(Nn, axis=1, keepdims=True) + 1e-12

# Verificación: malla cerrada
e = np.sort(np.concatenate([T_all[:, [0, 1]], T_all[:, [1, 2]], T_all[:, [2, 0]]]), axis=1)
cnt = Counter(map(tuple, e))
print('open edges', sum(1 for v in cnt.values() if v == 1), 'non-manifold', sum(1 for v in cnt.values() if v > 2))
print('verts', len(V_all), 'tris', len(T_all), 'volume sign', np.sign(vol))

# Escribir GLB
pos = V_all.astype(np.float32); nor = Nn.astype(np.float32); uv = UV_all.astype(np.float32); idx = T_all.astype(np.uint32).ravel()
blobs = [idx.tobytes(), pos.tobytes(), nor.tobytes(), uv.tobytes()]
views, off, binbuf = [], 0, b''
for bts, tgt in zip(blobs, [34963, 34962, 34962, 34962]):
    pad = (-len(binbuf)) % 4; binbuf += b'\0' * pad
    views.append({'buffer': 0, 'byteOffset': len(binbuf), 'byteLength': len(bts), 'target': tgt}); binbuf += bts
j['bufferViews'] = views
j['buffers'] = [{'byteLength': len(binbuf)}]
j['accessors'] = [
    {'bufferView': 0, 'componentType': 5125, 'count': len(idx), 'type': 'SCALAR'},
    {'bufferView': 1, 'componentType': 5126, 'count': len(pos), 'type': 'VEC3', 'min': pos.min(0).tolist(), 'max': pos.max(0).tolist()},
    {'bufferView': 2, 'componentType': 5126, 'count': len(nor), 'type': 'VEC3'},
    {'bufferView': 3, 'componentType': 5126, 'count': len(uv), 'type': 'VEC2'},
]
j['meshes'][0]['primitives'][0] = {'attributes': {'POSITION': 1, 'NORMAL': 2, 'TEXCOORD_0': 3}, 'indices': 0, 'material': j['meshes'][0]['primitives'][0].get('material', 0), 'mode': 4}
j['materials'][0]['doubleSided'] = False  # ya es una malla cerrada
js = json.dumps(j, separators=(',', ':')).encode(); js += b' ' * ((-len(js)) % 4)
binbuf += b'\0' * ((-len(binbuf)) % 4)
out = struct.pack('<4sII', b'glTF', 2, 12 + 8 + len(js) + 8 + len(binbuf)) + struct.pack('<I4s', len(js), b'JSON') + js + struct.pack('<I4s', len(binbuf), b'BIN\0') + binbuf
open('tofu-closed.glb', 'wb').write(out)
print('written', len(out))
