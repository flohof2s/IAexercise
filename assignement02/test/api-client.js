const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function logOk(msg) {
  console.log('✓', msg);
}
function logStep(title) {
  console.log('\n=== ' + title + ' ===');
}

async function request(method, url, data) {
  try {
    const res = await api.request({ method, url, data, validateStatus: () => true });
    return res;
  } catch (err) {
    console.error(`Request error [${method.toUpperCase()} ${url}]`, err.message);
    throw err;
  }
}

async function testRoot() {
  logStep('GET /');
  const res = await request('get', '/');
  assert(res.status === 200, `Expected 200, got ${res.status}`);
  assert(typeof res.data === 'string', 'Expected welcome text');
  logOk('Root erreichbar');
}


async function testSalesManCRUD(){
    logStep('Salesman CRUD');
    
    const createBody = {
        id: 1909,
        name: "TestUserCRUD",
        email: "test@test.de",
        salary: 1000,
        phone: "18544",
        birthday: "01.01.1970"
    }

    // Create
    const createRes = await request('post', '/api/salesman', createBody);
    assert(createRes.status==200, `Create failed: ${createRes.status}`);
    const created = createRes.data;
    assert(created && (created._id || created.id), 'Created entity has no id');
    const id = created.id;
    logOk(`Created salesman id=${id}`);

    // Read (list)
    const listRes = await request('get', '/api/salesman');
    assert(listRes.status === 200, `List failed: ${listRes.status}`);
    assert(Array.isArray(listRes.data), 'List response should be array');
    logOk('Listed salesmen');

     // Read (single)
    const getRes = await request('get', `/api/salesman/${id}`);
    assert(getRes.status === 200, `Get failed: ${getRes.status}`);
    assert(getRes.data && (getRes.data._id === id || getRes.data.id === id), 'Fetched wrong entity');
    logOk('Fetched salesman by id');

    //Create SPR
    const createSPRBody = {
        id:10000,
        year:2024,
        score:2.5,
        salesManId:id
    }
    const createSPRRes = await request('post', '/api/socialperformancerecord', createSPRBody);
    assert(createSPRRes.status==200, `Create failed: ${createSPRRes.status}`);
    const createdSPR = createSPRRes.data;
    assert(createdSPR && (createdSPR._id || createdSPR.id), 'Created entity has no id');
    const SPRid = createdSPR.id;
    logOk(`Created socialperformancerecord id=${SPRid}`);

    //Get Bonus Salary
    const bonusSalaryRes = await request('get',`/api/salesman/${id}/bonussalary`);
    assert(bonusSalaryRes.status === 200, `Get bonus salary failed: ${bonusSalaryRes.status}`);
    assert(bonusSalaryRes.data==2500,"Computation is wrong: "+bonusSalaryRes.data)
    logOk('Get Bonus Computation by SalesManId');


    // Delete SPR
    const delSPR = await request('delete', `/api/socialperformancerecord/${SPRid}`);
    assert(delSPR.status==200, `Delete failed: ${delSPR.status}`);
    logOk('Deleted socialperformancerecord');

    // Delete
    const delRes = await request('delete', `/api/salesman/${id}`);
    assert(delRes.status==200, `Delete failed: ${delRes.status}`);
    logOk('Deleted salesman');
}


async function main() {
  console.log(`Base URL: ${BASE_URL}`);

  await testRoot();
  await testSalesManCRUD();

  // Falls deine Routen anders heißen / anderes Verhalten haben, hier anpassen:

  console.log('\nAll tests done.');
}

main().catch((err) => {
  console.error('\nTest run failed:', err.message);
  process.exit(1);
});