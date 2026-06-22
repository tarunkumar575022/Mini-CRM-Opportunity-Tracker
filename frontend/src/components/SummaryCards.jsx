import React from 'react';
import { IndianRupee, Trophy, AlertCircle, CalendarClock } from 'lucide-react';
import { isToday } from 'date-fns';
import { formatCurrency } from '../utils/formatCurrency';

const SummaryCards = ({ opportunities }) => {
  // Calculate stats
  const totalValue = opportunities.reduce((sum, opp) => sum + (opp.estimatedValue || 0), 0);
  
  const wonOpps = opportunities.filter(opp => opp.stage === 'Won');
  const wonValue = wonOpps.reduce((sum, opp) => sum + (opp.estimatedValue || 0), 0);
  
  const highPriorityCount = opportunities.filter(opp => opp.priority === 'High').length;
  
  const followUpsToday = opportunities.filter(opp => 
    opp.nextFollowUpDate && isToday(new Date(opp.nextFollowUpDate))
  ).length;

  const cards = [
    {
      title: 'Total Pipeline',
      value: formatCurrency(totalValue),
      subtitle: `${opportunities.length} active deals`,
      icon: <IndianRupee size={40} className="text-blue-600" />,
      bg: 'bg-blue-50',
      border: 'border-l-4 border-l-blue-500'
    },
    {
      title: 'Won Deals',
      value: wonOpps.length.toString(),
      subtitle: `${formatCurrency(wonValue)} total value`,
      icon: <Trophy size={40} className="text-green-600" />,
      bg: 'bg-green-50',
      border: 'border-l-4 border-l-green-500'
    },
    {
      title: 'High Priority',
      value: highPriorityCount.toString(),
      subtitle: 'Need attention',
      icon: <AlertCircle size={40} className="text-red-600" />,
      bg: 'bg-red-50',
      border: 'border-l-4 border-l-red-500'
    },
    {
      title: 'Follow-ups Today',
      value: followUpsToday.toString(),
      subtitle: 'Due today',
      icon: <CalendarClock size={40} className="text-amber-600" />,
      bg: 'bg-amber-50',
      border: 'border-l-4 border-l-amber-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className={`card p-4 sm:p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group ${card.border}`}>
          <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-2 gap-3 sm:gap-0">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">{card.title}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
            <div className={`p-2 sm:p-3 rounded-xl ${card.bg} group-hover:scale-110 transition-transform self-start`}>
              {card.icon}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
