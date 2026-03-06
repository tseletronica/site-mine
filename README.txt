1) Abra o arquivo:
   site-mine\index.html

2) Edite o IP do servidor:
   No final do index.html, troque:
     const IP = 'COLOQUE_AQUI_O_IP';
   para o IP real.

3) (Opcional) Se quiser servir via HTTP local:
   - Use qualquer servidor estático.
   - Exemplo (PowerShell):
     python -m http.server 8080
   Depois abra: http://localhost:8080/site-mine/
