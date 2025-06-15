/* eslint-disable testing-library/no-unnecessary-act */
import {useGender} from "../shared/rules/index.jsx";
import { useContext, useEffect, useState , act} from "react";
import { LanguageProvider, LanguageContext } from "../context/LanguageProvider.context";
import { render, screen } from "@testing-library/react";
import lang from "../assets/lang/language";
 
const MockComponent = () => {
    const [ gender, start , optional] = useGender();
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
            <div>{gender[0]}</div>
            <div>{gender[1]}</div>
            <div>{optional? 'true' : 'false'}</div>
            <div>{start}</div>
            <div>{languageChanged ? "English" : "Arabic"}</div>
        </>
    );
};

xdescribe("useGender", () => {
    it("should return the correct gender and start value in ar initially", async () => {
        render(
            <LanguageProvider>
                <MockComponent />
            </LanguageProvider>
        );

        expect(screen.getByText(lang.ar.gender[0])).toBeInTheDocument();
        expect(screen.getByText(lang.ar.gender[1])).toBeInTheDocument(); 
        expect(screen.getByText('false')).toBeInTheDocument();  
        expect(screen.getByText(0)).toBeInTheDocument(); 
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
        
        expect(await screen.findByText(lang.en.gender[0])).toBeInTheDocument();
        expect(await screen.findByText(lang.en.gender[1])).toBeInTheDocument(); 
        expect(await screen.findByText('false')).toBeInTheDocument();
        expect(await screen.findByText(0)).toBeInTheDocument();
        expect(await screen.findByText("English")).toBeInTheDocument();
    });
});
