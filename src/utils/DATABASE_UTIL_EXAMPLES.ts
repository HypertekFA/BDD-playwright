// // DatabaseUtil Usage Examples

// // 1. BASIC QUERY EXECUTION
// Given('I query all users', async function (this: CustomWorld) {
//   const dbUtil = await this.getDbUtil();
//   const users = await dbUtil.execute(
//     'SELECT * FROM Users'
//   );
//   console.log('All users:', users);
// });

// // 2. QUERY WITH PARAMETERS
// When('I search for user {string}', async function (this: CustomWorld, email: string) {
//   const dbUtil = await this.getDbUtil();
//   const user = await dbUtil.executeForOne(
//     'SELECT * FROM Users WHERE Email = @email',
//     { email }
//   );
//   this.currentUser = user;
// });

// // 3. EXECUTE AND STORE RESULT
// When('I get all active users', async function (this: CustomWorld) {
//   const dbUtil = await this.getDbUtil();
//   await dbUtil.executeAndStore(
//     'active_users',
//     'SELECT * FROM Users WHERE Status = @status',
//     { status: 'active' }
//   );
// });

// // 4. RETRIEVE STORED RESULT
// Then('I should see {int} active users', async function (this: CustomWorld, expectedCount: number) {
//   const dbUtil = await this.getDbUtil();
//   const users = dbUtil.getResultData('active_users');
//   expect(users?.length).toBe(expectedCount);
// });

// // 5. INSERT DATA
// Given('I create a new user {string}', async function (this: CustomWorld, email: string) {
//   const dbUtil = await this.getDbUtil();
//   const password = faker.internet.password();
  
//   const result = await dbUtil.insert(
//     'INSERT INTO Users (Email, Password) VALUES (@email, @password)',
//     { email, password }
//   );
  
//   // Store for later reference
//   await dbUtil.executeAndStore('new_user', 
//     'SELECT * FROM Users WHERE Email = @email',
//     { email }
//   );
// });

// // 6. UPDATE DATA
// When('I update user {string} status to {string}', async function (this: CustomWorld, email: string, status: string) {
//   const dbUtil = await this.getDbUtil();
//   const affectedRows = await dbUtil.update(
//     'UPDATE Users SET Status = @status WHERE Email = @email',
//     { email, status }
//   );
//   console.log(`Updated ${affectedRows} rows`);
// });

// // 7. DELETE DATA
// Then('I delete user {string}', async function (this: CustomWorld, email: string) {
//   const dbUtil = await this.getDbUtil();
//   const deletedRows = await dbUtil.delete(
//     'DELETE FROM Users WHERE Email = @email',
//     { email }
//   );
//   expect(deletedRows).toBeGreaterThan(0);
// });

// // 8. GET STORED RESULT VALUES
// Then('the new user should have email {string}', async function (this: CustomWorld, expectedEmail: string) {
//   const dbUtil = await this.getDbUtil();
//   const email = dbUtil.getResultValue('new_user', 'Email', 0);
//   expect(email).toBe(expectedEmail);
// });

// // 9. CHECK IF RESULT EXISTS
// And('verify result exists', async function (this: CustomWorld) {
//   const dbUtil = await this.getDbUtil();
//   const hasResult = dbUtil.hasResult('new_user');
//   expect(hasResult).toBe(true);
// });

// // 10. AUTO-GENERATE RESULT KEYS
// When('I run multiple queries', async function (this: CustomWorld) {
//   const dbUtil = await this.getDbUtil();
  
//   const key1 = dbUtil.generateResultKey('users');
//   await dbUtil.executeAndStore(key1, 'SELECT * FROM Users');
  
//   const key2 = dbUtil.generateResultKey('users');
//   await dbUtil.executeAndStore(key2, 'SELECT * FROM Users WHERE IsActive = 1');
// });

// // 11. CLEAR RESULTS
// Then('I clear all stored results', async function (this: CustomWorld) {
//   const dbUtil = await this.getDbUtil();
//   dbUtil.clearResults();
// });

// // 12. GET ALL RESULTS
// And('display all stored query results', async function (this: CustomWorld) {
//   const dbUtil = await this.getDbUtil();
//   const allResults = dbUtil.getAllResults();
//   allResults.forEach((result, key) => {
//     console.log(`${key}:`, result);
//   });
// });

// // 13. CHECK CONNECTION
// Given('verify database is connected', async function (this: CustomWorld) {
//   const dbUtil = await this.getDbUtil();
//   const isConnected = dbUtil.isConnected();
//   expect(isConnected).toBe(true);
// });
