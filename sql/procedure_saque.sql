DROP PROCEDURE IF EXISTS `saque`;
DELIMITER $$
CREATE PROCEDURE saque (
		var_cod_conta INT(20),
		var_valor_saque DOUBLE)
BEGIN 
		SET @conta = (SELECT cod_conta FROM conta_corrente WHERE cod_conta = var_cod_conta);
		SET @saldo = (SELECT saldo FROM conta_corrente WHERE cod_conta = var_cod_conta);
		SET @limite = (SELECT limite FROM conta_corrente WHERE cod_conta = var_cod_conta);
		SET @saldo_total = @saldo + @limite;
		IF(@conta IS NULL)THEN
			SELECT "Conta inexistente" as msg;
		ELSE
			IF(var_valor_saque < @saldo_total)THEN
					INSERT INTO registro_saque(cod_conta, dt_saque, valor_saque) VALUES (var_cod_conta, NOW(), var_valor_saque);
					SELECT "Saque Realizado!" AS msg;
			ELSE
					SELECT "Saldo insuficiente!" AS msg;
			END IF;
		END IF;
END $$
DELIMITER;