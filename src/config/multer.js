const Multer = require('multer');
const Images = Multer.diskStorage
(
    {
        destination: (req, file, cb) =>
        {
            cb(null, 'public/img');
        },
        filename: (req, file, cb) =>
        {
            const fileName = `${new Date().getTime()}-${file.originalname}`;
            cb(null, fileName);
        }
    }
);
const Articles = Multer.diskStorage
(
    {
        destination: (req, file, cb) =>
        {
            cb(null, 'public/articles');
        },
        filename: (req, file, cb) =>
        {
            const fileName = `${new Date().getTime()}-${file.originalname}`;
            cb(null, fileName);
        }
    }
);
module.exports = 
{
    Articles: 
    {
        storage: Articles
    },
    Images:
    {
        storage: Images
    }
};