/* eslint-disable no-undef */
describe('template spec', () => {
    it('passes', () => {
        cy.visit('/register');
        // your test logic here
        cy.get("input[name='name']").type("ahmed mohamed omar mohamed");
        cy.get("input[name='phone']").type("+20100000000");
        cy.get("select[name='nationality']").select("مصري");
        // cy.get("input[name='gender']").type("ذكر");
        cy.get("input[name='email']").type("membo1@gmail.com");
        cy.get("input[name='password']").type("Member@123");
        cy.get("input[name='confirmPassword']").type("Member@123");
        cy.get("input[name='ssn']").type("30303060104694");
        cy.get("select[name='job']").select("طالب");
        cy.get("[testid='registerbtnnext']").click();

        cy.get("input[name='faceImage']").selectFile('cypress/fixtures/act1.jpeg');
        cy.get("input[name='ssnImage']").selectFile('cypress/fixtures/act2.jpeg');
        cy.get("[testid='registerbtnsubmit']").click();
    });

    afterEach(() => {
        cy.visit('/login');
        cy.get("input[name='email']").type("SuperAdmin@gmail.com");
        cy.get("input[name='password']").type("SuperAdmin@123");
        cy.get("[testid='loginbtnsubmit']").click();

        cy.window().its('sessionStorage').should('have.property', 'token');
        // Wait for token to be set in sessionStorage
        cy.window().then((win) => {
            const tokenStr = win.sessionStorage.getItem("token");

            if (!tokenStr) {
                throw new Error("Token not found in sessionStorage");
            }

            let tokenObj;
            try {
                tokenObj = JSON.parse(tokenStr);
            } catch (e) {
                throw new Error("Failed to parse token from sessionStorage");
            }

            if (!tokenObj.token) {
                throw new Error("Parsed token object does not contain 'token' property");
            }

            // Use the token in the API call
            cy.request({
                method: "DELETE",
                url: "https://localhost:7016/api/Member/Delete/5/ar",
                headers: {
                    Authorization: `Bearer ${tokenObj.token}`,
                },
                failOnStatusCode: false // optional: avoid test failure if DELETE fails
            });
        });
      });
});
