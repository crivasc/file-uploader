const API = 'https://catalogo.zayapa.net/admin/api/';
const TOKEN = 'f804d7a941fe9816df849023ac945b'

export const updPic=(picData)=>{
    console.log(picData)
    const sect = fetch(`${API}cockpit/addAssets?token=${TOKEN}`, {
        method: 'post',
        body: picData
    })
    .then(res=>res.json())

    return sect
}