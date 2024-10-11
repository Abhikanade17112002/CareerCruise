const multer = require("multer") ;

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        
        
        if (file.fieldname === 'profilePic') {
            cb(null, './uploads/userProfile');  // Directory for profile pictures
        } else if (file.fieldname === 'resume') {
            cb(null, './uploads/userresume');   // Directory for resumes
        } 
        else if (file.fieldname === 'companyLogo') {
            cb(null, './uploads/companyLogo');   // Directory for companyLogo
        } 
        
        else {
            cb(null, './uploads'); 
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
});
 const upload = multer({ storage: storage });

module.exports = upload ;