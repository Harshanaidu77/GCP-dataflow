
function process(line) {

  var values = line.split(",");

  // Skip header and empty rows
  if (!line || values[0].trim().toLowerCase() === "emp_id") {
    return null;
  }

  var obj = {};

  // Existing transformations
  obj.emp_id = parseInt(values[0].trim(), 10);
  obj.emp_name = values[1].trim().toUpperCase();
  obj.department = values[2].trim().toUpperCase();
  obj.salary = parseFloat(values[3].trim());
  obj.city = values[4].trim().toUpperCase();
  obj.email = values[5].trim().toLowerCase();
  obj.joining_date = values[6].trim();

  // 1. Annual salary
  obj.annual_salary = obj.salary * 12;

  // 2. Annual bonus (10%)
  obj.annual_bonus = obj.annual_salary * 0.10;

  // 3. Total annual compensation
  obj.total_compensation =
    obj.annual_salary + obj.annual_bonus;

  // 4. Salary category
  if (obj.salary >= 80000) {
    obj.salary_category = "HIGH";
  } else if (obj.salary >= 40000) {
    obj.salary_category = "MEDIUM";
  } else {
    obj.salary_category = "LOW";
  }

  // 5. Email domain
  obj.email_domain = obj.email.split("@")[1] || "";

  // 6. Joining year
  var joiningDate = new Date(obj.joining_date);

  if (!isNaN(joiningDate.getTime())) {
    obj.joining_year = joiningDate.getUTCFullYear();

    // 7. Years of experience
    var today = new Date();
    var experience = today.getUTCFullYear() -
                     joiningDate.getUTCFullYear();

    var anniversaryPassed =
      today.getUTCMonth() > joiningDate.getUTCMonth() ||
      (today.getUTCMonth() === joiningDate.getUTCMonth() &&
       today.getUTCDate() >= joiningDate.getUTCDate());

    if (!anniversaryPassed) {
      experience--;
    }

    obj.experience_years = Math.max(0, experience);

    // 8. Employee status
    obj.employee_status =
      obj.experience_years >= 3 ? "EXPERIENCED" : "NEW";

  } else {
    obj.joining_year = null;
    obj.experience_years = null;
    obj.employee_status = "UNKNOWN";
  }

  return JSON.stringify(obj);
}
