/* eslint-disable testing-library/no-unnecessary-act */
import {useNationality} from "../shared/rules/index.jsx";
import { useContext, useEffect, useState , act} from "react";
import { LanguageProvider, LanguageContext } from "../context/LanguageProvider.context";
import { render, screen } from "@testing-library/react";
import lang from "../assets/lang/language";

const MockComponent = () => {
    const [ nationality, start , optional, autoDOBFill] = useNationality();
    const { changeLanguage } = useContext(LanguageContext);
    const [languageChanged, setLanguageChanged] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            changeLanguage("en");
            setLanguageChanged(true);
        }, 500);

        return () => clearTimeout(timer);
    }, [changeLanguage]);

    return (
        <>
            {nationality.map((n,i) => <div key={i}>{n}</div>)}
            <div>{optional? 'true' : 'false'}</div>
            <div>{start}</div>
            {nationality.map((n, k) => <div key={k}>{ autoDOBFill.includes(k) ? "auto" : "manaul"}</div>)}
            <div>{languageChanged ? "English" : "Arabic"}</div>
        </>
    );
};

xdescribe("useNationailty", () => {
    it("should return the correct gender and start value in ar initially", async () => {
        render(
            <LanguageProvider>
                <MockComponent />
            </LanguageProvider>
        );

        for( let nationality of lang.ar.nationality) {
            expect(screen.getByText(nationality)).toBeInTheDocument();
        } 
        expect(screen.getByText('false')).toBeInTheDocument();  
        expect(screen.getByText(0)).toBeInTheDocument();
        expect(screen.queryAllByText("auto").length).toBe(1);  
        expect(screen.queryAllByText("manaul").length).toBe(1);  
        expect(screen.getByText("Arabic")).toBeInTheDocument();
    }); 
    
    it("should change to correct gender and start value in en after timeout", async () => {
        jest.useFakeTimers(); 
        
        act(() => {
            render(
                <LanguageProvider>
                    <MockComponent />
                </LanguageProvider>
            );
        }); 
        
        await act(async () => {
            jest.advanceTimersByTime(500);
        });
        

        for (let nationality of lang.en.nationality) {
            expect(await screen.findByText(nationality)).toBeInTheDocument();
        } 
        expect(await screen.findByText('false')).toBeInTheDocument();
        expect(await screen.findByText(0)).toBeInTheDocument();
        expect(await screen.findByText("English")).toBeInTheDocument();
    });
});
