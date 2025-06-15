/* eslint-disable testing-library/no-unnecessary-act */
// @ts-check
//<reference types="jest" />

import { useSubscriptionType} from "../shared/rules/index.jsx";
import { useContext, useEffect, useState, act } from "react";
import { LanguageProvider, LanguageContext } from "../context/LanguageProvider.context.jsx";
import { render, screen } from "@testing-library/react";
import lang from "../assets/lang/language.js";

const MockComponent = () => {
    const [ subscriptionTypes, startM , optional, yearlySubscription, monthlySubscription, halfYearlySubscription ] = useSubscriptionType();
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
            {subscriptionTypes.map((n, i) => <div key={i}>{n}</div>)}
            <div>{optional ? 'true' : 'false'}</div>
            <div>{startM === 0 ? '0' : '1'}</div> 
            <div>{languageChanged ? "English" : "Arabic"}</div>
        </>
    );  
}; 

xdescribe("useSocialStatus", () => {
    it("should return the correct gender and start value in ar initially", async () => {
        render(
            <LanguageProvider>
                <MockComponent />
            </LanguageProvider>
        );

        for (let subscriptionTypes of lang.ar.subscriptionTypes) {
            expect(screen.getByText(subscriptionTypes)).toBeInTheDocument();
        }
        expect(screen.getByText('false')).toBeInTheDocument();
        expect(screen.queryAllByText('0').length).toBe(1);
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

        for (let subscriptionTypes of lang.en.subscriptionTypes) {
            expect(await screen.findByText(subscriptionTypes)).toBeInTheDocument();
        }

        expect(await screen.findByText('false')).toBeInTheDocument();
        expect(await screen.queryAllByText('0').length).toBe(1); 
        expect(await screen.findByText("English")).toBeInTheDocument();
    });
});
