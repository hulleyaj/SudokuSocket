using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SudokuSocket.Services
{
    //https://www.geeksforgeeks.org/program-sudoku-generator/
    //Following is the improved logic for the problem.
    //1. Fill all the diagonal 3x3 matrices.
    //2. Fill recursively rest of the non-diagonal matrices.
    //   For every cell to be filled, we try all numbers until
    //   we find a safe number to be placed.
    //3. Once matrix is fully filled, remove K elements
    //   randomly to complete game.

    // [row][col]
    //"Square Index" is as follows
    // 0 1 2
    // 3 4 5
    // 6 7 8
    public class BoardService
    {
        private static Random rGen = new Random();

        public static HashSet<Tuple<int, int>> RESTRICTED_INDEXES = Enumerable.Range(0, 9).Select(f => new Tuple<int, int>(f, (f / 3) * 3)).ToHashSet();

        public static List<List<int>> CreateBoard()
        {
            List<List<int>> board = InitializeEmptyBoard();
            GenerateDiagonalBigSquares(board);
            FillBoardRecursively(board, 0, 3);

            return board;
        }

        public static List<List<int>> InitializeEmptyBoard() => Enumerable.Range(0, 9).Select(f => Enumerable.Repeat(0, 9).ToList()).ToList();

        public static void GenerateDiagonalBigSquares(List<List<int>> board)
        {
            for (int square = 0; square <= 2; square++)
            {
                int row = square * 3;
                int startingCol = row;
                int col = row;
                List<int> availableNumbers = Enumerable.Range(1, 9).ToList();

                for (int i = 9; i > 0; i--)
                {
                    int index = rGen.Next(0, i);

                    board[row][col] = availableNumbers[index];

                    availableNumbers.RemoveAt(index);

                    if (i % 3 == 1)
                    {
                        row++;
                        col = startingCol;
                    }
                    else
                    {
                        col++;
                    }
                }
            }
        }

        public static void FillBoardRecursively(List<List<int>> board, int row, int col)
        {
            List<int> remainingNumbers = GetAvailableNumbers(board, row, col).OrderBy(f => rGen.Next()).ToList();

            foreach (int number in remainingNumbers)
            {
                board[row][col] = number;
                DebuggerPrintBoard(board);
                if (row == 8 && col == 5)
                {
                    return;
                }

                if (col == 8)
                {
                    if (RESTRICTED_INDEXES.Contains(new Tuple<int, int>(row + 1, 0)))
                    {
                        FillBoardRecursively(board, row + 1, 3);
                    }
                    else
                    {
                        FillBoardRecursively(board, row + 1, 0);
                    }   
                }
                else if (RESTRICTED_INDEXES.Contains(new Tuple<int, int>(row, col + 1)))
                {
                    if (col + 4 >= 9)
                    {
                        FillBoardRecursively(board, row + 1, 0);
                    }
                    else
                    {
                        FillBoardRecursively(board, row, col + 4);
                    }
                }
                else
                {
                    FillBoardRecursively(board, row, col + 1);
                }
            }

            board[row][col] = 0;
        }

        #region AvailableNumbers

        public static IEnumerable<int> GetAvailableNumbers(List<List<int>> board, int row, int col)
        {
            return Enumerable.Range(1, 9)
                .Except(board[row])
                .Except(board.Select(f => f[col]))
                .Except(GetUsedNumbersBySquare(board, row, col));
        }

        public static IEnumerable<int> GetUsedNumbersBySquare(List<List<int>> board, int row, int col)
        {
            row = (row / 3) * 3;
            col = (col / 3) * 3;

            List<int> numbers = new List<int>();

            for (int i = row; i <= row + 2; i++)
            {
                for (int j = col; j <= col + 2; j++)
                {
                    numbers.Add(board[i][j]);
                }
            }

            return numbers;
        }

        #endregion AvailableNumbers

        #region BoardValidation
        public static bool SquareCheck(List<List<int>> board, int squareIndex)
        {
            int row = (squareIndex / 3) * 3;
            int col = (squareIndex % 3) * 3;

            List<int> numbers = new List<int>();

            for (int i = row; i <= row + 2; i++)
            {
                for (int j = col; j <= col + 2; j++)
                {
                    numbers.Add(board[i][j]);
                }
            }

            return numbers.Distinct().Except(new List<int>() { 0 }).Count() == 9;
        }

        public static bool RowCheck(List<List<int>> board, int index) => board[index].Distinct().Count() == board[index].Count();

        public static bool ColumnCheck(List<List<int>> board, int index) => board.Select(f => f[index]).Distinct().Count() == board.Select(f => f[index]).Count();

        #endregion BoardValidation

        #region PrintBoard
        public static void DebuggerPrintBoard(List<List<int>> board)
        {
            StringBuilder sb = new StringBuilder();

            for (int rowIndex = 0; rowIndex <= 8; rowIndex++)
            {
                for (int colIndex = 0; colIndex <= 8; colIndex++)
                {
                    sb.Append(board[rowIndex][colIndex]);

                    if ((colIndex + 1) % 3 == 0)
                    {
                        sb.Append("   ");
                    }
                }

                sb.AppendLine();

                if ((rowIndex + 1) % 3 == 0)
                {
                    sb.AppendLine();
                }
            }

            sb.AppendLine("----------------------------------");

            Console.WriteLine(sb.ToString());
            Debug.WriteLine(sb.ToString());
        }

        #endregion PrintBoard
    }
}