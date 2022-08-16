/*
  Recebe uma coleção contendo objetos possivelmente duplicados e retorna uma coleção de grupos segundo algum atributo/campo 
  dos objetos da coleção. Um grupo nada mais é do que uma sub-coleção de objetos associados a determinado atributo/campo. 
  Assim, a coleção retornada por este método tem o formato [ {valor1Atributo -> [obj1, obj2, obj3, etc]} ] onde obji é um 
  objeto cujo valor do atributo informado corresponde a valor1Atributo.
  @param key - Nome da chave a ser usada na filtragem.
  @param collection - Coleção de objetos a ser filtrada.
  @returns Um objeto com diferentes valores, como atributos, relacionados à chave informada e para cada um desses atributos, 
  um array de objetos agrupados pela referida chave.
*/

export const groupBy = (key: any, collection: any[]) => {
  const collectionCopy = [...collection];

  const result = collectionCopy.reduce((resultObj, currItem) => {
    const group = currItem[key];

    if (!resultObj[group]) {
      resultObj[group] = [];
    }

    resultObj[group].push(currItem);

    return resultObj;
  }, {});

  return result;
};

/*
  Recebe uma coleção contendo objetos possivelmente duplicados e retorna uma coleção de objetos sem duplicatas. 
  Neste caso a função recebe como parâmetro uma coleção de objetos e o nome do atributo a considerar nessa filtragem.
  @param key - Nome da chave a ser usada na filtragem.
  @param collection - Coleção de objetos a ser filtrada.
  @returns Um array de objetos sem duplicatas.
*/

export const distinct = (key: any, collection: any[]) => {
  const groupedItems = groupBy(key, collection);

  const result = Object.values(groupedItems).map((arr: any) => arr[0]);

  return result;
};

/*
  Recebe uma coleção de objetos e um atributo e retorna uma coleção ordenada pelo atributo informado.
  @param key - Nome da chave a ser usada na ordenação.
  @param collection - Coleção de objetos a ser ordenada.
  @returns Uma coleção ordenada em relação à chave especificada.
*/

export const orderBy = (key: any, collection: any[]) => {
  const collectionCopy = [...collection];

  const result = collectionCopy.sort((a, b) => {
    return a[key] < b[key] ? -1 : 1;
  });

  return result;
};

/*
  Recebe uma função reducer, um valor inicial e uma coleção de objetos e reduz a coleção à um único valor.
  @param reducer - Função de redução.
  @param initialValue - Valor inicial da redução.
  @param collection - Coleção de objetos a ser reduzida.
  @returns O valor final da redução.
*/

export const reduce = (
  reducer: (acc: any, curr: any) => any,
  initialValue: any,
  collection: any[]
) => {
  const collectionCopy = [...collection];

  return collectionCopy.reduce(reducer, initialValue);
};

/*
  Função compose(f1, ..., fn) - que representa a função de composição (alta ordem), correspondendo a compose(f1,f2)(arg) = f1(f2(arg))).
  @param functions - Funções a serem compostas, sendo a primeira a mais externa da composição e a última a mais interna da composição.
  @returns função composta.
*/

export const compose = (...functions: Function[]) => {
  const composition = (...args: any) =>
    functions.reduceRight((params, fn) => fn(params), args);

  return composition;
};
