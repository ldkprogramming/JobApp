const routes_admin = require("../routes/admins");

describe("Admin routes", () => {
  it("should render the home page", async () => {
    const req = {
      session: {
        rolesIdMap: {
          adminId: 1,
          recruiterId: 2,
          applicantId: 3,
        },
      },
    };
    const res = {
      render: jest.fn(),
    };
    const next = jest.fn();
    await routes_admin.home(req, res, next);
    expect(res.render).toHaveBeenCalledWith("admin/home", {
      idAdmin: 1,
      idRecruiter: 2,
      idApplicant: 3,
    });
  });
  it("should render the organisation history page", async () => {
    const req = {
      session: {
        rolesIdMap: {
          adminId: 1,
          recruiterId: 2,
          applicantId: 3,
        },
        query: {
          search: "search",
        },
      },
    };
    const res = {
      render: jest.fn(),
    };
    const next = jest.fn();
    await routes_admin.organisationHistory(req, res, next);
    expect(res.render).toHaveBeenCalledWith(
      "admin/organisation_registration_request_history",
      {
        organisations: "search",
        idAdmin: 1,
        idRecruiter: 2,
        idApplicant: 3,
      }
    );
  });
  it("should render the organisation history page without search", async () => {
    const req = {
      session: {
        rolesIdMap: {
          adminId: 1,
          recruiterId: 2,
          applicantId: 3,
        },
        query: {},
      },
    };
    const res = {
      render: jest.fn(),
    };
    const next = jest.fn();
    await routes_admin.organisationHistory(req, res, next);
    expect(res.render).toHaveBeenCalledWith(
      "admin/organisation_registration_request_history",
      {
        organisations: "search",
        idAdmin: 1,
        idRecruiter: 2,
        idApplicant: 3,
      }
    );
  });
});
