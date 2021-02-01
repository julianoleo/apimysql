use MePoupe;
DROP PROCEDURE IF EXISTS `deposito`;
DELIMITER $$
CREATE PROCEDURE deposito (
		var_cod_conta INT(20),
		var_valor_deposito DOUBLE)
BEGIN 
		SET @conta = (SELECT cod_conta FROM conta_corrente WHERE cod_conta = var_cod_conta);
		IF(var_valor_deposito = 0 || var_valor_deposito IS NULL)THEN
			SELECT "Valor Zerado ou Nulo!" as msg;
		ELSE 
			IF(@conta IS NULL)THEN
				SELECT "Conta inexistente" as msg;
			ELSE
				INSERT INTO registro_deposito(cod_conta, dt_deposito, valor_deposito) VALUES (var_cod_conta, NOW(), var_valor_deposito);
				SELECT "Deposito Realizado!" as msg;
			END IF;
		END IF;
END $$
DELIMITER;