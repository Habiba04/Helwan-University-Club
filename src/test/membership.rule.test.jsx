/* eslint-disable testing-library/no-unnecessary-act */
import { useMembership } from "../shared/rules/index.jsx";
import { useContext, useEffect, useState, act } from "react";
import { LanguageProvider, LanguageContext } from "../context/LanguageProvider.context.jsx";
import { render, screen } from "@testing-library/react";
import lang from "../assets/lang/language.js";

const MockComponent = () => {
    const [membershipTypes, start, optional, workingMembership, sportMembership, foreignerMembership]  = useMembership();
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
            {membershipTypes.map((n, i) => <div key={i}>{n}</div>)}
            <div>{optional ? 'true' : 'false'}</div>
            <div>{start}</div>
            <div>{languageChanged ? "English" : "Arabic"}</div>
        </>
    );
};

xdescribe("use membershipTypes", () => {
    it("should return the correct gender and start value in ar initially", async () => {
        render(
            <LanguageProvider>
                <MockComponent />
            </LanguageProvider>
        );

        for (let membershipTypes of lang.ar.membershipTypes) {
            expect(screen.getByText(membershipTypes)).toBeInTheDocument();
        }
        expect(screen.getByText('false')).toBeInTheDocument();
        expect(screen.getByText(1)).toBeInTheDocument();
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


        for (let membershipTypes of lang.en.membershipTypes) {
            expect(await screen.findByText(membershipTypes)).toBeInTheDocument();
        }
        expect(await screen.findByText('false')).toBeInTheDocument();
        expect(await screen.findByText(1)).toBeInTheDocument(); 
        expect(await screen.findByText("English")).toBeInTheDocument();
    });
});
