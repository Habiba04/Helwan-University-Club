/* eslint-disable testing-library/no-unnecessary-act */
import { useSubscriptionMode,useSubscriptionStatus} from "../shared/rules/index.jsx";
import { useContext, useEffect, useState, act } from "react";
import { LanguageProvider, LanguageContext } from "../context/LanguageProvider.context.jsx";
import { render, screen } from "@testing-library/react";
import lang from "../assets/lang/language.js";

const MockComponent = () => {
    const [ subscriptionModes, startM , optionalM ] = useSubscriptionMode();
    const [ subscriptionStatus, startS, optionalS ] = useSubscriptionStatus();
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
            {subscriptionModes.map((n, i) => <div key={i}>{n}</div>)}
            {subscriptionStatus.map((n, i) => <div key={i}>{n}</div>)}
            <div>{optionalS ? 'trueS' : 'falseS'}</div>
            <div>{optionalM ? 'trueM' : 'falseM'}</div>
            <div>{startS === 0 ? '0' : '1'}</div>
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

        for (let subscriptionModes of lang.ar.subscriptionModes) {
            expect(screen.getByText(subscriptionModes)).toBeInTheDocument();
        }
        for (let subscriptionStatus of lang.ar.subscriptionStatus) {
            expect(screen.getByText(subscriptionStatus)).toBeInTheDocument();
        }
        expect(screen.getByText('falseS')).toBeInTheDocument();
        expect(screen.getByText('falseM')).toBeInTheDocument();
        expect(screen.queryAllByText('0').length).toBe(2);
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

        for (let subscriptionModes of lang.en.subscriptionModes) {
            expect(await screen.findByText(subscriptionModes)).toBeInTheDocument();
        }
        for (let subscriptionStatus of lang.en.subscriptionStatus) {
            expect(await screen.findByText(subscriptionStatus)).toBeInTheDocument();
        } 
        expect(await screen.findByText('falseS')).toBeInTheDocument();
        expect(await screen.findByText('falseM')).toBeInTheDocument();
        expect(await screen.queryAllByText('0').length).toBe(2); 
        expect(await screen.findByText("English")).toBeInTheDocument();
    });
});
