using System.Security.Cryptography;
using System.Text;

namespace PontosTuristicosAPI.Helpers
{
    public static class HashHelper
    {
        // Método para gerar o hash SHA-256 da senha
        public static string GerarHashSHA256(string senha)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] senhaBytes = Encoding.UTF8.GetBytes(senha);
                byte[] hashBytes = sha256.ComputeHash(senhaBytes);
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower(); // Retorna o hash como string hexadecimal
            }
        }
    }
}
