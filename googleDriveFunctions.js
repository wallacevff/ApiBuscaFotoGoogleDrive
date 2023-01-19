const auth = require('./googleDriveAuth');
const { google } = require('googleapis');
const imgToPDF = require('image-to-pdf')
const fs = require('fs').promises;
const fsA = require('fs');
const File = require("file-class");
const base64Img = require('base64-img');
const { stringify } = require('querystring');
class GoogleDrive {
    async Athorize() {
        this.client = await auth();
    }
}
var numos = 946891
async function GoogleDriveListFiles(numos) {
    //console.log(numos.toString());
    const g = new GoogleDrive();
    await g.Athorize();
    const drive = google.drive({ version: 'v3', auth: g.client });
    const res = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
        q: 'mimeType=\'image/\'',
        q: `name='${numos}'`
    });
    ;
    const files = res.data.files;
    if (files.length === 0) {
        console.log('No files found.');
        return;

    }
    else {
        files.map((file) => console.log(file))

    }


    var a = await drive.files.get({
        fileId: files[0].id,
        alt: "media"
    }, { responseType: 'arraybuffer' })
    //fs.writeFile("asdff.jpg", Buffer.from(a.data));
    var imagem = { id: files[0].id, media: a.data };
    //console.log(imagem);
    //return (imagem);
    class ObjImg {
        constructor() {
            this.id = "";
            this.media = "";
        }
    }
    var imagem = new ObjImg();
    imagem.id = `${files[0].id}`; imagem.media = (Buffer.from(a.data));
    return imagem;
    //return (Buffer.from(a.data));
}
 
module.exports = GoogleDriveListFiles;
