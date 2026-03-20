import React, { lazy, Suspense } from "react";

const HomePage = lazy(() => import("home/HomePage").catch(() => {
    return { default: () => <div>Error loading Home. Is it running?</div> };
}));
const DataPage = lazy(() => import("data/DataPage").catch(() => {
    return { default: () => <div>Error loading Data. Is it running?</div> };
}));
const SettingsPage = lazy(() => import("settings/SettingsPage").catch(() => {
    return { default: () => <div>Error loading Settings. Is it running?</div> };
}));

const App = () => {
    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Host Application (localhost:3000)</h1>
            <p>This is the main host shell. Below are the remote microfrontends:</p>

            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <div style={{ border: "2px dashed blue", padding: "10px", flex: 1 }}>
                    <h2>Home Microfrontend</h2>
                    <Suspense fallback={<div>Loading Home Page...</div>}>
                        <HomePage />
                    </Suspense>
                </div>

                <div style={{ border: "2px dashed green", padding: "10px", flex: 1 }}>
                    <h2>Data Microfrontend</h2>
                    <Suspense fallback={<div>Loading Data Page...</div>}>
                        <DataPage />
                    </Suspense>
                </div>
                <div style={{ border: "2px dashed green", padding: "10px", flex: 1 }}>
                    <h2>Settings Microfrontend</h2>
                    <Suspense fallback={<div>Loading settings Page...</div>}>
                        <SettingsPage />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default App;
