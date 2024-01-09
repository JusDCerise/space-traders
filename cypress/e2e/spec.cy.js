describe("template spec", () => {
  it("passes", () => {
    cy.on("uncaught:exception", () => {
      return false;
    });
    /* Connexion */
    cy.visit("http://localhost:5173");
    cy.get("form.loginForm").find("input").type("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQ1lQUkVTU19URVNURVIiLCJ2ZXJzaW9uIjoidjIuMS40IiwicmVzZXRfZGF0ZSI6IjIwMjMtMTItMzAiLCJpYXQiOjE3MDQ3ODg3MzIsInN1YiI6ImFnZW50LXRva2VuIn0.QNSnqE4FYKlJPySCPa1iw26LspMsSbUEMpRPB8gtmN2uDswopUfcqMr391NjCrbrWcusI3l7euY-p2cquk1tk1Ueosp8rYGc3sFqkZ3XDfsDN95c40WRbHICv_OZYdG72EuMcMsG-uhPu7wlXLR8NRGVC4qtOaYB5nlnmdi_I2W4CUhbCjJFOey4QyWbHk2kdJbCu2DAegmJn89ds6pDEk_o99YKQNUvzaHxz-tKeCGH8qPstJ3GFxKvXGpl60MRcrgd3ma3NjePdcIF0tHLTh335TJ3vot6jSIdlvA6P7lnlFrE34SS9OJ3FEaH5SjsjqJ4_oUUl-Ie92lvyRH-ww");
    cy.get("form.loginForm").find("button.btn-prm").click();
    cy.get("div.headerNav").find("a.headerLink").find("span:contains('Profile')").click();
    cy.get("div.content").find("p:contains('Username: CYPRESS_TESTER')");
    cy.get("div.headerNav").find("a.headerLink").find("span:contains('Fleet')").click();
    cy.get("tr.ship:contains('CYPRESS_TESTER-1')").find("a:contains('See more')").click();
    cy.get("button.btn-prm:contains('Extract')").should("be.disabled");
    cy.get("button.btn-prm:contains('Navigate')").should("be.disabled");
    cy.get("p:contains('DOCKED')").find("button.btn-prm").click();
    cy.get("p:contains('IN_ORBIT')");
    cy.get("button.btn-prm:contains('Navigate')").should("not.be.disabled");

    // cy.xpath("/html/body/main/div/div[2]/div[2]/form[1]/label/input");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/nav/a[1]").should("have.attr", "aria-selected", "true");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/nav/a[2]").click();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/nav/a[2]").should("have.attr", "aria-selected", "true");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/nav/a[1]").should("have.attr", "aria-selected", "false");

    /* Widgets auto complete */
    // cy.visit("https://demoqa.com/auto-complete");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[2]/div/div/div/div/div[1]").type("red{enter}");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[2]/div/div/div/div/div[1]").type("blue{enter}");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div/div[1]").type("blue{enter}");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div/div[1]").type("red{enter}");

    /* Widgets accordion */
    // cy.visit("https://demoqa.com/accordian");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]").should("have.class", "show");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div/div[2]/div[1]").click();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div/div[2]/div[2]").should("have.class", "show");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]").should("not.have.class", "show");

    /* Form */
    // cy.visit("https://demoqa.com/automation-practice-form");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[1]/div[2]/input").type("First");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[1]/div[4]/input").type("Last");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[2]/div[2]/input").type("mail@mail.com");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[3]/div[2]/div[1]").click();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[4]/div[2]/input").type("010203040506");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[6]/div[2]/div/div/div[1]").type("Maths{enter}");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[7]/div[2]/div[1]").click();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[9]/div[2]/textarea").type("Mon contenu de text area");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[10]/div[2]/div/div/div[2]/div").click();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[10]/div[2]/div/div/div[1]/div[2]/div/input").click();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[10]/div[3]/div/div").click();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[10]/div[3]/div/div/div[1]/div[2]/div/input").click();

    /* Dynamic properties */
    // cy.visit("https://demoqa.com/dynamic-properties");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/button[1]").should("have.attr", "disabled");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/button[2]").should("not.have.class", "text-danger");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/button[3]").should("not.be");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/button[1]").should("not.have.attr", "disabled");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/button[2]").should("have.class", "text-danger");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/button[3]");

    /* Buttons */
    // cy.visit("https://demoqa.com/buttons");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[1]/button").dblclick();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[2]/button").rightclick();
    // cy.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/p[1]');
    // cy.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/p[2]');

    /* WebTables */
    // cy.visit("https://demoqa.com/webtables");
    // cy.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]').children().should("have.length", 10);
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[3]/div[2]/div/div[2]/span[2]/select").select('50');
    // cy.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]').children().should("have.length", 50);
    // cy.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[1]/div/div[1]').contains("Cierra");
    // cy.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[1]/div/div[2]').contains("Vega");
    // cy.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/input').type("Cierra");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[2]/div[1]/button").click();
    // cy.xpath("/html/body/div[5]").should("have.attr", "aria-modal", "true");
    // cy.xpath('/html/body/div[5]/div/div/div[2]/form/div[1]/div[2]/input').type("First");
    // cy.xpath('/html/body/div[5]/div/div/div[2]/form/div[2]/div[2]/input').type("Last");
    // cy.xpath('/html/body/div[5]/div/div/div[2]/form/div[3]/div[2]/input').type("mail@mail.com");
    // cy.xpath('/html/body/div[5]/div/div/div[2]/form/div[4]/div[2]/input').type("20");
    // cy.xpath('/html/body/div[5]/div/div/div[2]/form/div[5]/div[2]/input').type("5000");
    // cy.xpath('/html/body/div[5]/div/div/div[2]/form/div[6]/div[2]/input').type("33");
    // cy.xpath("/html/body/div[5]/div/div/div[2]/form/div[7]/div/button").click();
    // cy.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/input').type("First");

    /* Radio */
    // cy.visit("https://demoqa.com/radio");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[2]").click();
    // cy.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/p/span').should("have.class", "text-success");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[3]").click();
    // cy.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/p').contains("You have selected Impressive");

    /* Checkbox */
    // cy.visit("https://demoqa.com/checkbox");
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[1]/div/button[1]").click();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div/ol/li/ol/li[1]/ol/li[1]/span/label/span[3]").click();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div/ol/li/ol/li[1]/ol/li[1]/span/label/span[3]").click();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[1]/ol/li/ol/li[1]/span/button").click();
    // cy.xpath("/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[1]/ol/li/ol/li[3]/ol/li[1]/span/label").click();

    /* Form field */
    // cy.xpath('//*[@id="userEmail"]').should("have.attr", "placeholder", "name@example.com").type("guillaume@mail.com");
    // cy.xpath('//*[@id="submit"]').should("have.attr", "type", "button").click();
  });
});
