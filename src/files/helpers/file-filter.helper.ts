export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file) {
    return cb(new Error('File is empty'), false); //! indica que hay un error no se acepta el file
  }
  const fileExtencion = file.mimetype.split('/')[1];
  const validExtencions = ['jpg', 'jpeg', 'png', 'gif'];

  if (validExtencions.includes(fileExtencion)) {
    return cb(null, true); //! indica que no hay un error y acepta el file
  }

  cb(null, false);
};
