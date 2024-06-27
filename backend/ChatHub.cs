using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace backend
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task Send(UserConnection userConnection, string text)
        {
            await Clients.Group(userConnection.chat).RecieveMessage(userConnection.name, text);
        }
        public async Task RegisterUser(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.chat);
            await Clients.Group(userConnection.chat).RecieveMessage(userConnection.name, " присоединился к чату");
        }
    }
}