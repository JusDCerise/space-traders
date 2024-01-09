describe("template spec", () => {
  it("passes", () => {
    cy.on("uncaught:exception", () => {
      return false;
    });
    /* Connexion */
    cy.visit("https://space-traders.netlify.app/");
    cy.get("form.loginForm").find("input").type("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQ1lQUkVTU19URVNURVIiLCJ2ZXJzaW9uIjoidjIuMS40IiwicmVzZXRfZGF0ZSI6IjIwMjMtMTItMzAiLCJpYXQiOjE3MDQ3ODg3MzIsInN1YiI6ImFnZW50LXRva2VuIn0.QNSnqE4FYKlJPySCPa1iw26LspMsSbUEMpRPB8gtmN2uDswopUfcqMr391NjCrbrWcusI3l7euY-p2cquk1tk1Ueosp8rYGc3sFqkZ3XDfsDN95c40WRbHICv_OZYdG72EuMcMsG-uhPu7wlXLR8NRGVC4qtOaYB5nlnmdi_I2W4CUhbCjJFOey4QyWbHk2kdJbCu2DAegmJn89ds6pDEk_o99YKQNUvzaHxz-tKeCGH8qPstJ3GFxKvXGpl60MRcrgd3ma3NjePdcIF0tHLTh335TJ3vot6jSIdlvA6P7lnlFrE34SS9OJ3FEaH5SjsjqJ4_oUUl-Ie92lvyRH-ww");
    cy.get("form.loginForm").find("button.btn-prm").click();
    cy.get("div.headerNav").find("a.headerLink").find("span:contains('Profile')").click();
    cy.get("div.content").find("p:contains('Username: CYPRESS_TESTER')");
    cy.get("div.headerNav").find("a.headerLink").find("span:contains('Fleet')").click();
    cy.get("tr.ship:contains('CYPRESS_TESTER-1')").find("a:contains('See more')").click();

    // cy.get("button.btn-prm:contains('Extract')").should("be.disabled");
    // cy.get("button.btn-prm:contains('Navigate')").should("be.disabled");
    // if (cy.get("p:contains('DOCKED')")) {
    //   cy.get("p:contains('DOCKED')").find("button.btn-prm").click();
    //   cy.get("button.btn-prm:contains('Extract')").should("be.disabled");
    //   cy.get("button.btn-prm:contains('Navigate')").should("be.disabled");
    // } else {
    //   cy.get("p:contains('IN_ORBIT')");
    //   cy.get("button.btn-prm:contains('Navigate')").should("not.be.disabled");
    // }
  });
});
