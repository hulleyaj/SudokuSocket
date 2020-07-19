using NUnit.Framework;
using SudokuSocket.Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SudokuSocket.Tests
{
    public class Tests
    {
        private List<List<int>> solvedBoard = new List<List<int>>()
        {
            new List<int>() { 8, 2, 7, 1, 5, 4, 3, 9, 6 },
            new List<int>() { 9, 6, 5, 3, 2, 7, 1, 4, 8 },
            new List<int>() { 3, 4, 1, 6, 8, 9, 7, 5, 2 },
            new List<int>() { 5, 9, 3, 4, 6, 8, 2, 7, 1 },
            new List<int>() { 4, 7, 2, 5, 1, 3, 6, 8, 9 },
            new List<int>() { 6, 1, 8, 9, 7, 2, 4, 3, 5 },
            new List<int>() { 7, 8, 6, 2, 3, 5, 9, 1, 4 },
            new List<int>() { 1, 5, 4, 7, 9, 6, 8, 2, 3 },
            new List<int>() { 2, 3, 9, 8, 4, 1, 5, 6, 7 }
        };

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Should_InitializeEmptyBoard()
        {
            List<List<int>> board = BoardService.InitializeEmptyBoard();

            for (int i = 0; i <= 8; i++)
            {
                for (int j = 0; j <= 8; j++)
                {
                    Assert.AreEqual(0, board[i][j]);
                }
            }
        }

        [Test]
        public void Should_have_own_reference_lists_on_board()
        {
            List<List<int>> board = BoardService.InitializeEmptyBoard();

            board[0][0] = 5;

            Assert.AreEqual(0, board[1][0]);
        }

        [Test]
        public void Should_return_true_SquareCheck()
        {
            Assert.AreEqual(true, BoardService.SquareCheck(solvedBoard, 4));
        }

        [Test]
        public void Should_return_false_SquareCheck()
        {
            List<List<int>> badBoard = solvedBoard.Select(f => new List<int>(f)).ToList();
            badBoard[3][3] = 6;

            Assert.AreEqual(false, BoardService.SquareCheck(badBoard, 4));
        }

        [Test]
        public void Should_return_true_RowCheck()
        {
            List<List<int>> board = new List<List<int>>() { new List<int>() { 8, 2, 7, 1, 5, 4, 3, 9, 6 } };

            Assert.AreEqual(true, BoardService.RowCheck(board, 0));
        }

        [Test]
        public void Should_return_false_RowCheck()
        {
            List<List<int>> board = new List<List<int>>() { new List<int>() { 2, 2, 7, 1, 5, 4, 3, 9, 6 } };

            Assert.AreEqual(false, BoardService.RowCheck(board, 0));
        }

        [Test]
        public void Should_return_true_ColumnCheck()
        {
            List<List<int>> board = new List<List<int>>() 
            {
                new List<int>() { 8 },
                new List<int>() { 9 },
                new List<int>() { 3 },
                new List<int>() { 5 },
                new List<int>() { 4 },
                new List<int>() { 6 },
                new List<int>() { 7 },
                new List<int>() { 1 },
                new List<int>() { 2 }
            };

            Assert.AreEqual(true, BoardService.ColumnCheck(board, 0));
        }

        [Test]
        public void Should_return_false_ColumnCheck()
        {
            List<List<int>> board = new List<List<int>>() 
            {
                new List<int>() { 9 },
                new List<int>() { 9 },
                new List<int>() { 3 },
                new List<int>() { 5 },
                new List<int>() { 4 },
                new List<int>() { 6 },
                new List<int>() { 7 },
                new List<int>() { 1 },
                new List<int>() { 2 }
            };

            Assert.AreEqual(false, BoardService.ColumnCheck(board, 0));
        }

        [Test]
        public void Should_GenerateDiagonalBigSquares()
        {
            List<List<int>> board = BoardService.InitializeEmptyBoard();
            BoardService.GenerateDiagonalBigSquares(board);

            for (int i = 0; i <= 8; i++)
            {
                Assert.AreEqual(3, board[i].Except(new List<int>() { 0 }).ToList().Count);
            }

            Assert.AreEqual(true, BoardService.SquareCheck(board, 0));
            Assert.AreEqual(true, BoardService.SquareCheck(board, 4));
            Assert.AreEqual(true, BoardService.SquareCheck(board, 8));
        }

        [Test]
        public void Should_GetUsedNumbersBySquare()
        {
            List<List<int>> board = new List<List<int>>
            {
                new List<int>() { 8, 0, 7 },
                new List<int>() { 0, 6, 5 },
                new List<int>() { 3, 4, 0 },
            };

            IEnumerable<int> retVal = BoardService.GetUsedNumbersBySquare(board, 2, 2);

            Assert.AreEqual(true, !retVal.Except(new List<int>() { 2, 9, 1 }).Any());
        }

        [Test]
        public void Should_GetAvailableNumbers()
        {
            List<List<int>> board = new List<List<int>>
            {
                new List<int>() { 8, 2, 7, 1, 5, 4, 3, 9, 6 },
                new List<int>() { 9, 6, 5, 3, 2, 7, 1, 4, 8 },
                new List<int>() { 3, 4, 1, 6, 8, 9, 7, 5, 2 },
                new List<int>() { 5, 9, 3, 0, 6, 8, 2, 7, 1 },
                new List<int>() { 0, 7, 2, 5, 0, 3, 6, 8, 0 },
                new List<int>() { 6, 1, 8, 0, 7, 2, 4, 3, 5 },
                new List<int>() { 7, 8, 6, 2, 3, 5, 9, 1, 4 },
                new List<int>() { 1, 5, 4, 7, 0, 6, 8, 2, 3 },
                new List<int>() { 2, 3, 9, 8, 0, 1, 5, 6, 7 }
            };

            IEnumerable<int> retVal = BoardService.GetAvailableNumbers(board, 4, 4);

            Assert.AreEqual(true, !retVal.Except(new List<int>() { 9, 4, 1 }).Any());
        }

        [Test]
        public void Should_GenerateRestrictedIndexes()
        {
            Assert.AreEqual(true, BoardService.RESTRICTED_INDEXES.Contains(new Tuple<int, int>(0, 0)));
            Assert.AreEqual(false, BoardService.RESTRICTED_INDEXES.Contains(new Tuple<int, int>(0, 1)));
            Assert.AreEqual(9, BoardService.RESTRICTED_INDEXES.Count);
        }

        [Test]
        public void Should_CreateBoard()
        {
            List<List<int>> retVal = BoardService.CreateBoard();

            int x = 2;
        }
    }
}