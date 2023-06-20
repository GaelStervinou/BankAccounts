const assert = require('assert');
const axios = require('axios');
const { describe, it } = require('mocha');

describe('Tests d\'intégration pour les APIs REST', () => {
  describe('PUT /users/:id/accounts/debit', () => {
    it('devrait débiter le montant spécifié du compte bancaire de l\'utilisateur', async () => {
      const userId = 1;
      const amountToDebit = 100;

      const response = await axios.put(`http://localhost:3000/users/${userId}/accounts/debit`, { amount: amountToDebit });

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.message, `Montant de ${amountToDebit} débité avec succès`);
    });

    it('devrait retourner une erreur 422 si le montant spécifié est supérieur au solde du compte', async () => {
      const userId = 1;
      const amountToDebit = 100000;

      try {
        await axios.put(`http://localhost:3000/users/${userId}/accounts/debit`, { amount: amountToDebit });
      } catch (error) {
        assert.strictEqual(error.response.status, 422);
        assert.strictEqual(error.response.data.error, 'Pas assez de thunes');
      }
    });
  });

  describe('PUT /users/:id/accounts/credit', () => {
    it('devrait créditer le montant spécifié sur le compte bancaire de l\'utilisateur', async () => {
      const userId = 1;
      const amountToCredit = 200;

      const response = await axios.put(`http://localhost:3000/users/${userId}/accounts/credit`, { amount: amountToCredit });

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data.message, `Montant de ${amountToCredit} crédité avec succès`);
    });

    it('devrait retourner une erreur 422 si le montant spécifié est supérieur au solde du compte', async () => {
      const userId = 1;
      const amountToCredit = 100000;

      try {
        await axios.put(`http://localhost:3000/users/${userId}/accounts/credit`, { amount: amountToCredit });
      } catch (error) {
        assert.strictEqual(error.response.status, 422);
        assert.strictEqual(error.response.data.error, 'Trop de thunes');
      }
    });
  });

  describe('GET /users/:id/accounts', () => {
    it('devrait retourner les informations du compte bancaire de l\'utilisateur', async () => {
      const userId = 1;

      const response = await axios.get(`http://localhost:3000/users/${userId}/accounts`);

      assert.strictEqual(response.status, 200);
      assert.strictEqual(typeof response.data, 'object');
      // Vérifier les propriétés de l'objet retourné
      assert.strictEqual(typeof response.data.accountNumber, 'string');
      assert.strictEqual(typeof response.data.balance, 'number');
    });
  });
});
