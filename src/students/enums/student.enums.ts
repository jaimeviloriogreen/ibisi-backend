/**
 * Enum representing the academic level of a student.
 * @enum {string}
 */
export enum StudentLevel {
  /**
   * First year of the program.
   * @type {string}
   */
  FIRST = "FIRST_YEAR",

  /**
   * Second year of the program.
   * @type {string}
   */
  SECOND = "SECOND_YEAR",

  /**
   * Third year of the program.
   * @type {string}
   */
  THIRD = "THIRD_YEAR",

  /**
   * Fourth year of the program.
   * @type {string}
   */
  FOURTH = "FOURTH_YEAR",
}

/**
 * Enum representing the status of a student's account.
 * @enum {string}
 */
export const StudentAccountStatus = {
  /**
   * All payments are up to date.
   * @type {string}
   */
  PAID: "PAID",

  /**
   * Payments are pending.
   * @type {string}
   */
  PENDING_PAYMENT: "PENDING_PAYMENT",

  /**
   * A partial payment has been made.
   * @type {string}
   */
  PARTIALLY_PAID: "PARTIALLY_PAID",

  /**
   * Payments are overdue or past due.
   * @type {string}
   */
  OVERDUE: "OVERDUE",

  /**
   * The account is under review or in dispute.
   * @type {string}
   */
  IN_DISPUTE: "IN_DISPUTE",

  /**
   * Exempt from payments.
   * @type {string}
   */
  EXEMPT: "EXEMPT",
};

/**
 * Enum representing the status of a student's enrollment.
 * @enum {string}
 */
export enum StudentStatus {
  /**
   * Currently enrolled and active.
   * @type {string}
   */
  ENROLLED = "ENROLLED",

  /**
   * Withdrawn or retired from the institution.
   * @type {string}
   */
  WITHDRAWN = "WITHDRAWN",

  /**
   * Successfully completed the program.
   * @type {string}
   */
  GRADUATED = "GRADUATED",
}
