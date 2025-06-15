import useProfileFieldsRoles from "../shared/services/useProfileFields";
import { render, screen } from "@testing-library/react";
import { LanguageProvider, LanguageContext } from "../context/LanguageProvider.context";
import { useContext } from "react";
const MockComponent = ({type}) => {
    const { nationality, membership, } = useProfileFieldsRoles();
    const { changeLanguage } = useContext(LanguageContext);
    changeLanguage("en");
    return (
        <div>
            {nationality.fields.map((n, i) => <div key={i}>{n}</div>)}

            {type === 'f' &&
                (
                    membership.fields.filter((n, i1) => nationality.autoDOBFill.includes(i1) 
                    ).map((n, i) => <div key={i} data-testid={`fkey${i}`}>{n} - {i}</div>)
                ) 
            }
            
        
            

        </div>
    );
}


describe("should enforce the correct profile roles", () => {
    it("should allow only non-egy members to have foreign memberships ", () => {
        
        render(
            <LanguageProvider>
                <MockComponent type="f" /> 
            </LanguageProvider>
        );
        expect(screen.getAllByTestId("fkey0").length).toBe(1);  
        
    }) 
})

