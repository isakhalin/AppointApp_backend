import path from 'path';

// path.resolve возвращает полный физический путь до указанного расположения и файла.
// Например C:\build\index.html
export const createPath = () => path.resolve('build/index.html');
console.log("Запускаемый билд расположен: ", createPath());