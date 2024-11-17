function parseTime(time) {
  return time.split(/(T|-|\.)+/);
}

function getDate(time) {
  let dateArray = parseTime(time),
      timeArray = dateArray[6].split(':');

  return new Date(dateArray[0], Number(dateArray[2]) - 1, dateArray[4], timeArray[0], timeArray[1], timeArray[2]);
}

export function prepareSchedule (checkups, type) {
  let result =  checkups.reduce(function (acc, current) {
    if (current.type === type) {
      const timeIncludesIndex = acc.findIndex((item) => item.time === current.start_at) ?? null;

      if (timeIncludesIndex >= 0) {
        acc[timeIncludesIndex].info.push({
          id: current.id,
          description: current.description,
          status: current.status
        });
      } else {
        acc.push({
          time: current.start_at,
          info: [
            {
              id: current.id,
              description: current.description,
              status: current.status
            }
          ]
        });
      }
    }

    return acc;
  }, []);

  let newResult = result.sort((item1, item2) => {
    let time1 = getDate(item1.time),
        time2 = getDate(item2.time);

    if (time1 > time2) {
      return 1;
    }

    if (time1 < time2) {
      return -1;
    }

    return 0;
  });

  return result;
}

export function prepareParams (checkups) {
  return checkups.reduce(function (acc, current) {
    if (current.type === 'measurements') {
      const paramIncludesIndex = acc.findIndex((item) => item.name === parseDescription(current.description));
// debugger
      if (paramIncludesIndex >= 0) {
        if (
          (typeof current.checkup_data.value === "string" && current.checkup_data.value.length > 0) ||
          typeof current.checkup_data.value === "number"
        ) {
          acc[paramIncludesIndex].values.push({
            time: prepareTime(current.start_at),
            result: String(current.checkup_data.value),
          });
        } else if (
          (typeof current.formattedValue === "string" && current.formattedValue.length > 0) ||
          typeof current.formattedValue.value === "number"
        ) {
          acc[paramIncludesIndex].values.push({
            time: prepareTime(current.start_at),
            result: String(current.formattedValue),
          });
        }
      } else {
        let values = [];
        if (typeof current.checkup_data.value === "string" && current.checkup_data.value.length > 0) {
          values.push({
            time: prepareTime(current.start_at),
            result: current.checkup_data.value,
          });
        } else if (typeof current.formattedValue === "string" && current.formattedValue.length > 0) {
          values.push({
            time: prepareTime(current.start_at),
            result: current.formattedValue,
          });
        }

        acc.push({
          name: parseDescription(current.description),
          values: values
        });
      }
    }

    return acc;
  }, []);
}
function parseDescription(text) {
  return text.split('"')[1] ?? '';
}

export function setStatusText(status) {
  let text = '';

  switch (status) {
    case 'not-started':
      text = 'Предстоит выполнить';
      break;
    case 'in-progress':
      text = 'Необходимо выполнить рекоммендацию';
      break;
    case 'finished':
      text = 'Выполнено';
      break;
    case 'fail':
      text = 'Не выполнено';
      break;
  }

  return text;
}

export function setStatusColor(status) {
  let color = '';

  switch (status) {
    case 'not-started':
      color = 'gray';
      break;
    case 'in-progress':
      color = 'yellow';
      break;
    case 'finished':
      color = 'green';
      break;
    case 'fail':
      color = 'red';
      break;
  }

  return color;
}

export function prepareTime(time) {
  let timeArray = parseTime(time);

  return `${timeArray[4]}.${timeArray[2]}.${timeArray[0]} ${timeArray[6]}`;
}
