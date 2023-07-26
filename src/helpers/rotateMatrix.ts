
export default function rotateMatrix(matrix: number[][]): number[][] {
    
  const countRows:number = matrix.length - 1;

    const result: number[][] = matrix.map((row, rowIndex) =>

      row.map((_column, columnIndex) => {
        //let c = column;
        return matrix[countRows - columnIndex][rowIndex]
      
      })

    );
    
    return result;
}