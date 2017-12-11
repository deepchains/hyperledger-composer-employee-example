/**
 * Sample transaction processor function.
 * @param {com.knoldus.model.SwitchCompany} tx The sample transaction instance.
 * @transaction
 */
function switchCompany(tx) {
  
  var oldCompany = tx.employee.company;
  tx.employee.company = tx.newCompany
  return getAssetRegistry('com.knoldus.model.Employee')
    .then(function (assetRegistry) {
    	return assetRegistry.update(tx.employee);
  })
  .then(function () {
    var event = getFactory().newEvent('com.knoldus.model', 'EmployeeEvent');
    event.employee = tx.employee;
    event.oldCompany = oldCompany;
    event.newCompany = tx.newCompany;
    emit(event);
  });
}