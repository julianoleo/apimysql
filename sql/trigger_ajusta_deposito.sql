DROP TRIGGER IF EXISTS `ajusta_saldo_deposito`;

DELIMITER $
CREATE TRIGGER ajusta_saldo_deposito AFTER INSERT
ON registro_deposito
FOR EACH ROW
BEGIN
		SET @saldo = (SELECT saldo FROM conta_corrente WHERE cod_conta = new.cod_conta);		
		SET @saldo_atual = @saldo + new.valor_deposito;
		UPDATE conta_corrente SET saldo = @saldo_atual WHERE cod_conta = new.cod_conta;
END$
DELIMITER;