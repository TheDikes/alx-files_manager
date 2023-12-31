const request = require('request');
const { promisify } = require('util');
const process = require('process');
const assert = require('assert');

const PORT = process.env.PORT || '5000';
const HOST = '0.0.0.0';
const url = `${HOST}:${PORT}`;

describe('apI Endpoints', () => {
  describe('gEt /status', () => {
    const promRequest = promisify(request);
    const myRequest = promRequest(`http://${url}/status`);

    it('correct url', () => {
      assert.equal(url, `${HOST}:${PORT}`);
    });

    it('no error', async () => {
      await myRequest
        .then()
        .catch((err) => { assert.equal(err, null); });
    });

    it('good status', async () => {
      await myRequest
        .then(
          (res) => {
            assert.equal(res.statusCode, 200);
          },
        )
        .catch();
    });

    it('correct response', async () => {
      await myRequest
        .then(
          (res) => {
            try {
              assert.equal(res.body, '{"redis":true,"db":true}');
            } catch (error) {
              throw (new Error('Wrong response'));
            }
          },
        )
        .catch();
    });
  });

  describe('gET /stats', () => {
    const promRequest = promisify(request);
    const myRequest = promRequest(`http://${url}/stats`);

    it('correct url', () => {
      assert.equal(url, `${HOST}:${PORT}`);
    });

    it('no error', async () => {
      await myRequest
        .then()
        .catch((err) => { assert.equal(err, null); });
    });

    it('good status', async () => {
      await myRequest
        .then(
          (res) => {
            assert.equal(res.statusCode, 200);
          },
        )
        .catch();
    });

    it('correct response', async () => {
      await myRequest
        .then(
          (res) => {
            try {
              const data = JSON.parse(res.body);
              assert.equal(true, typeof data.users === 'number');
              assert.equal(true, typeof data.files === 'number');
            } catch (error) {
              throw (new Error('Wrong response'));
            }
          },
        )
        .catch();
    });
  });
});
