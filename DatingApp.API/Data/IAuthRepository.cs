using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
         Task<UserManagement> Register(UserManagement user,string password);
         Task<UserManagement> Login(string username,string password);
         Task<bool> UserExists(string username);
    }
}