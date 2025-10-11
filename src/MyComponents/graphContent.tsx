import { Cpu, Zap, TrendingUp, Shield } from 'lucide-react'
import Image from 'next/image'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16">
                <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
                   Financial  <br />
                    <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  success, 
                   simplified.
                   </span>
                </h2>
                <div className="relative">
                    <div className="relative z-10 space-y-4 md:w-1/2">
                        <p>
                            Simplicity is more than just expense tracking. <span className="font-medium">It's a complete financial ecosystem</span> — from intelligent budgeting to real-time insights that help you make better money decisions.
                        </p>
                        <p>
                            Our platform combines powerful analytics with intuitive design, giving you the tools to track, analyze, and optimize your finances effortlessly.
                        </p>

                        <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Zap className="size-4 text-teal-600 dark:text-teal-400" />
                                    <h3 className="text-sm font-medium">Lightning Fast</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Instant transaction sync and real-time updates keep you on top of your finances without the wait.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="size-4 text-teal-600 dark:text-teal-400" />
                                    <h3 className="text-sm font-medium">Smart Insights</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    AI-powered analytics identify spending patterns and suggest ways to reach your financial goals faster.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="md:mask-l-from-35% md:mask-l-to-55% mt-12 h-fit md:absolute md:-inset-y-12 md:inset-x-0 md:mt-0">
                        <div className="border-border/50 relative rounded-2xl border border-dotted p-2">
                            <Image
                                src="/charts.webp"
                                className="hidden rounded-[12px] dark:block"
                                alt="financial analytics dashboard dark"
                                width={1207}
                                height={929}
                            />
                            <Image
                                src="/charts-light.webp"
                                className="rounded-[12px] shadow dark:hidden"
                                alt="financial analytics dashboard light"
                                width={1207}
                                height={929}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}