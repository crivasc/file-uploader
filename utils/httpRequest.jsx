export const API = 'https://catalogo.zayapa.net/admin/api/';
export const mainUrl = 'https://catalogo.zayapa.net/admin/'
export const TOKEN = 'f804d7a941fe9816df849023ac945b'

export const updPic=(picData)=>{
    console.log(picData)
    const sect = fetch(`${API}cockpit/addAssets?token=${TOKEN}`, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: picData
    })
    .then(res=>res.json())

    return sect
}


export const ets=()=>{
    let resulta = fetch(`${API}cockpit/assets?token=${TOKEN}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
    })
    .then(assets => assets.json())

    return resulta
}