/* eslint-disable testing-library/no-unnecessary-act */
import { useSocialStatus } from "../shared/rules/index.jsx";
import { useContext, useEffect, useState, act } from "react";
import { LanguageProvider, LanguageContext } from "../context/LanguageProvider.context.jsx";
import { render, screen } from "@testing-library/react";
import lang from "../assets/lang/language.js";

const MockComponent = () => {
    const [socialStatus, start, optional]  = useSocialStatus();
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
            {socialStatus.map((n, i) => <div key={i}>{n}</div>)}
            <div>{optional ? 'true' : 'false'}</div>
            <div>{start}</div>
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

        for (let socialStatus of lang.ar.socialStatus) {
            expect(screen.getByText(socialStatus)).toBeInTheDocument();
        }
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


        for (let socialStatus of lang.en.socialStatus) {
            expect(await screen.findByText(socialStatus)).toBeInTheDocument();
        }
        expect(await screen.findByText('false')).toBeInTheDocument();
        expect(await screen.findByText(0)).toBeInTheDocument();
        expect(await screen.findByText("English")).toBeInTheDocument();
    });
});
