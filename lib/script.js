/**
 * New script file
 */

/**
 * Sample transaction processor function.
 * @param {org.acme.model.SwitchCompany} tx The sample transaction instance.
 * @transaction
 */
function switchCompany(tx) {
    
    console.log("hereeeee");
    var oldCompany = tx.employee.company;
    console.log("old pk :"+oldCompany);
    tx.employee.company = tx.newCompany
    console.log("2222d222df");
    return getAssetRegistry('org.acme.model.Employee')
      .then(function (assetRegistry) {
          return assetRegistry.update(tx.employee);
    })
    .then(function () {
      var event = getFactory().newEvent('org.acme.model', 'EmployeeEvent');
      event.employee = tx.employee;
      event.oldCompany = oldCompany;
      event.newCompany = tx.newCompany;
      emit(event);
    });
  }