namespace backend.Interfaces
{
    public interface IChatClient
    {
        public Task RecieveMessage(string name, string text);
    }
}
