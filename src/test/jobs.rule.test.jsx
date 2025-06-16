/* eslint-disable testing-library/no-unnecessary-act */
import {useJobTypes} from "../shared/rules/index.jsx";
import { useContext, useEffect, useState , act} from "react";
import { LanguageProvider, LanguageContext } from "../context/LanguageProvider.context.jsx";
import { render, screen } from "@testing-library/react";
import lang from "../assets/lang/language.js";
 
const MockComponent = () => {
    const [ jobTypes, start , optional, haveNotSalary] = useJobTypes();
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
            {jobTypes.map((n,i) => <div key={i}>{n}</div>)}
            <div>{optional? 'true' : 'false'}</div>
            <div>{start}</div> 
            <div>{jobTypes.map((n, k) => <div key={k}>{ haveNotSalary.includes(k) ? "no salary" : "salary"}</div>)}</div> 
            <div>{languageChanged ? "English" : "Arabic"}</div>
        </>
    );
};

xdescribe("usejobTypes", () => {
    it("should return the correct gender and start value in ar initially", async () => {
        render(
            <LanguageProvider>
                <MockComponent />
            </LanguageProvider>
        );

        for (let jobTypes of lang.ar.jobTypes) {
            expect(screen.getByText(jobTypes)).toBeInTheDocument();
        } 
        expect(screen.getByText('false')).toBeInTheDocument();  
        expect(screen.getByText(1)).toBeInTheDocument();   
        expect(screen.queryAllByText("no salary").length).toBe(5);    
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
        

        for (let jobTypes of lang.en.jobTypes) {
            expect(await screen.findByText(jobTypes)).toBeInTheDocument();
        } 
        expect(await screen.findByText('false')).toBeInTheDocument();
        expect(await screen.findByText(1)).toBeInTheDocument();
        expect(await screen.findByText("English")).toBeInTheDocument();
    });
});
