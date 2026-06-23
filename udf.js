function process(line) {

  var values = line.split(",");

  if (values[0] === "emp_id") {
    return null;
  }

  var obj = {};

  obj.emp_id = parseInt(values[0], 10);
  obj.emp_name = values[1].toUpperCase();
  obj.department = values[2];
  obj.salary = parseInt(values[3], 10);
  obj.city = values[4];
  obj.email = values[5];
  obj.joining_date = values[6].trim();
  obj.annual_salary = obj.salary * 12;

  return JSON.stringify(obj);
}