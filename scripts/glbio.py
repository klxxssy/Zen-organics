import json,struct,numpy as np
def load(path):
    d=open(path,'rb').read()
    clen,=struct.unpack('<I',d[12:16]); j=json.loads(d[20:20+clen])
    bo=20+clen; blen,=struct.unpack('<I',d[bo:bo+4]); B=d[bo+8:bo+8+blen]
    def acc(i):
        a=j['accessors'][i]; bv=j['bufferViews'][a['bufferView']]
        off=bv.get('byteOffset',0)+a.get('byteOffset',0)
        n={'VEC3':3,'VEC2':2,'SCALAR':1}[a['type']]; dt=np.float32 if a['componentType']==5126 else np.uint32
        stride=bv.get('byteStride') or n*4
        raw=np.frombuffer(B,dtype=np.uint8,count=(a['count']-1)*stride+n*4,offset=off)
        out=np.lib.stride_tricks.as_strided(raw,shape=(a['count'],n*4),strides=(stride,1)).copy()
        return np.frombuffer(out.tobytes(),dtype=dt).reshape(-1,n)
    p=j['meshes'][0]['primitives'][0]; a=p['attributes']
    return acc(a['POSITION']),acc(a['NORMAL']),acc(a['TEXCOORD_0']),acc(p['indices']).reshape(-1,3),j
def loops(bd):
    from collections import defaultdict
    adj=defaultdict(list)
    for a,b in bd: adj[a].append(b); adj[b].append(a)
    seen=set(); out=[]
    for s in adj:
        if s in seen: continue
        comp=[]; st=[s]
        while st:
            v=st.pop()
            if v in seen: continue
            seen.add(v); comp.append(v); st+=adj[v]
        out.append(comp)
    return out
