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

export const groupBy = (key: string, collection: any[]) => {
  const collectionCopy = [...collection];
  
  const result = collectionCopy.reduce((acc, curr) => {
    const val = curr[key];

    if (!acc[val]) {
      acc[val] = [];
    }

    acc[val].push(curr);

    return acc;
  }, {});

  return result;
}

/*
  Recebe uma coleção contendo objetos possivelmente duplicados e retorna uma coleção de objetos sem duplicatas. 
  Neste caso a função recebe como parâmetro uma coleção de objetos e o nome do atributo a considerar nessa filtragem.

  @param key - Nome da chave a ser usada na filtragem.
  @param collection - Coleção de objetos a ser filtrada.

  @returns Um array de objetos sem duplicatas.
*/

export const distinct = (key: string, collection: any[]) => {
  const goupedItems = groupBy(key, collection);
  
  const result = Object.values(goupedItems)
    .filter((arr: any) => arr.length === 1)
    .map((arr: any) => arr[0])

  return result
}

/*
  Recebe uma coleção de objetos e um atributo e retorna uma coleção ordenada pelo atributo informado.

  @param key - Nome da chave a ser usada na ordenação.
  @param collection - Coleção de objetos a ser ordenada.

  @returns coleção ordenada.
*/

export const orderBy = (key: string, collection: any[]) => {
  const collectionCopy = [...collection]
  
  const result = collectionCopy.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }

    if (a[key] > b[key]) {
      return 1;
    }

    return 0;
  });

  return result
}

/*
  Recebe uma função reducer, um valor inicial e uma coleção de objetos e reduz a coleção à um único valor.

  @param reducer - Função de redução.
  @param initialValue - Valor inicial da redução.
  @param collection - Coleção de objetos a ser reduzida.

  @returns valor final da redução.
*/

export const reduce = (reducer: (acc: any, curr: any) => any, initialValue: any, collection: any[]) => {
  const collectionCopy = [...collection];
  
  return collectionCopy.reduce(reducer, initialValue);
}

/*
  Função compose(f1,f2) - que representa a função de composição (alta ordem), correspondendo a compose(f1,f2)(arg) = f1(f2(arg))).

  @param functions - Funções a serem compostas, sendo a primeira a mais externa da composição e a última a mais interna da composição.

  @returns função composta.
*/

export const compose = <R, F extends (a: R, ...b: any) => R>(fn1: F, ...fns: Array<(a: R) => R>) => {
  return fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1) as F
}