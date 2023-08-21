import { v4 as uuid } from 'uuid';
export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file) {
    return cb(new Error('File is empty'), false); //! indica que hay un error no se acepta el file
  }
  const fileExtencion = file.mimetype.split('/')[1];

  const fileName = `${uuid()}.${fileExtencion}`;

  cb(null, fileName);
};
