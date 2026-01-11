export const HomePage = () => {
    return (
        // calc(100vh - 64px) обеспечивает высоту во весь экран за вычетом высоты навбара
        <div className="relative w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">

            {/* Background Image with Parallax-like effect */}
            <div className="absolute inset-0 z-0">
                <img
                    // ЗАМЕНИТЕ ЭТУ ССЫЛКУ НА ВАШУ ЛОКАЛЬНУЮ: src="/assets/images/home_bg.jpg"
                    src="/main-background.jpg"
                    alt="Dota 2 Background"
                    className="w-full h-full object-cover opacity-80 animate-slow-zoom"
                />
                {/* Overlay Gradients for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Welcome to <span className="text-blue-600">Gaze of Skadi</span>
                    </h1>

                    <p className="max-w-2xl text-lg text-slate-600 mb-10">
                        Advanced Dota 2 analytics and statistics platform.
                    </p>
                </div>
            </div>
        </div>
    );
};
