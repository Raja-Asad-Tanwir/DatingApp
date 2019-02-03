using System;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Models
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _options;
        public AuthRepository(DataContext options)
        {
            _options = options;

        }
        public async Task<UserManagement> Login(string username, string password)
        {
            var user = await _options.Users.FirstOrDefaultAsync(x => x.Username == username);
            if(user == null){
                return null;
            }
            if(!VerifyPasswordHash(password,user.PasswordHash,user.PasswordSalt)){
                return null;
            }
            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
             using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)){
                
               var computedHash= hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
               for(int i=0;i<computedHash.Length;i++){
                   if(computedHash[i]!=passwordHash[i]) return false;
               }
               return true;
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordhash, out byte[] passwordsalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordsalt = hmac.Key;
                passwordhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<UserManagement> Register(UserManagement user, string password)
        {
           
               byte[] passwordHash,passwordSalt;
               CreatePasswordHash(password,out passwordHash,out passwordSalt);
               user.PasswordHash = passwordHash;
               user.PasswordSalt = passwordSalt;
               await _options.Users.AddAsync(user);
               await _options.SaveChangesAsync();

               return user;
 
        }

        public async Task<bool> UserExists(string username)
        {
            if(await _options.Users.AnyAsync(x=>x.Username == username)){
                return true;
            }
            return false;
        }
    }
}