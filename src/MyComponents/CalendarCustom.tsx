import { Badge } from "@/components/ui/badge";


const CalenderCustsomDesign = ()  => {
    return(
        <div>
               {/* Financial Calendar */}
                    <div className="bg-gradient-to-br from-white to-zinc-200/50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xs border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Financial Calendar</h3>
                        <Badge variant="outline">December 2025</Badge>
                      </div>
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                            {day}
                          </div>
                        ))}
                        {Array.from({ length: 35 }, (_, i) => {
                          const day = i - 6; // Start from previous month
                          const isCurrentMonth = day > 0 && day <= 31;
                          const hasEvent = [5, 12, 15, 22, 28].includes(day);
                          const eventType = day === 5 ? 'income' : day === 15 ? 'income' : 'bill';
                          
                          return (
                            <div
                              key={i}
                              className={`relative h-8 flex items-center justify-center text-xs rounded-md ${
                                isCurrentMonth
                                  ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                                  : 'text-gray-400 dark:text-gray-600'
                              } ${day === 27 ? 'bg-teal-200/60 dark:bg-teal-700/50 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-600' : ''}`}
                            >
                              {isCurrentMonth ? day : ''}
                              {hasEvent && isCurrentMonth && (
                                <div
                                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                                    eventType === 'income' ? 'bg-green-500' : 'bg-red-500'
                                  }`}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-400">Income</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-400">Bills Due</span>
                        </div>
                      </div>
                    </div>
        </div>
    )
}

export default CalenderCustsomDesign