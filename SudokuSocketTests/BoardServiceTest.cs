using NUnit.Framework;
using SudokuSocket.Services;

namespace SudokuSocket.Tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            int retVal = BoardService.CreateBoard();
            Assert.AreEqual(1, retVal);
        }
    }
}