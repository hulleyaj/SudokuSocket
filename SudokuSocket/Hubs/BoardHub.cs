using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SudokuSocket.Hubs
{
    public class BoardHub : Hub
    {
        Dictionary<string, List<string>> GroupsAndUsers = new Dictionary<string, List<string>>();

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            //bool isNewGroup = this.GroupsAndUsers.TryAdd(groupName, new List<string>() { Context.ConnectionId });

            //if (isNewGroup)
            //{
            //    await Clients.Group(groupName).SendAsync("UpdateGroupStatus", "Created new group");
            //}
            //else
            //{
            //    this.GroupsAndUsers[groupName].Add(Context.ConnectionId);
            //    await Clients.Group(groupName).SendAsync("UpdateGroupStatus", $"Current users in group: { this.GroupsAndUsers[groupName].Count }");
            //}
        }

        public async Task SendNumber(int val, int outerIndex, int innerIndex, string groupName)
        {
            await Clients.Group(groupName).SendAsync("ReceiveNumber", val, outerIndex, innerIndex);
        }
    }
}
